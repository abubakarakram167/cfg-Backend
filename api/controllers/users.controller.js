const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const userService = require('../dal/users.dao');
const userNotifService = require('../dal/user_notifications.dao');
const userGroupService = require('../dal/user_groups.dao');
const socketService = require('../dal/socket-ids.dao');
const authHelper = require('../helpers/auth.helper');
const responseMessages = require('../helpers/response-messages');
const { sendEmail, sendWelcomeEmail } = require('../helpers/mail.helper');
const model = require('../models/index');

module.exports = {
  addUser,
  register,
  login,
  loginSocial,
  listUsers,
  forgotPassword,
  resetPassword,
  updateStatus,
  deleteUsers,
  editUser,
  getOneByID,
  addUserSocket,
  removeUserSocket,
  removeAllSockets,
  removeAllUserSockets,
  addWindowSocket,
  getUserGroup,
  getUserGroupById
};

async function insert(userData,userId) {
  const user = { ...userData };
  user.passwordResetToken = authHelper.generateResetToken(64);
  //user.passwordResetTokenSentTime = new Date();
  user.salt = authHelper.generateRandomSalt();
  user.password = bcrypt.hashSync(user.password + user.salt, 10);
  user.created_at = new Date()
  user.created_by = userId;
  
  //console.log(user);
  //username done
  user.user_name = user.email.split('@')[0];
  const userDb = await userService.addUser(user);
  const userRaw = await userDb.get({ plain: true });
  delete userRaw.password;
  delete userRaw.salt;

  const resetLink = authHelper.getResetPasswordLink(user.passwordResetToken , "createPassword");
  sendWelcomeEmail(user, resetLink);

  return userRaw;
}

async function addUser(req, res) {
  const requestObject = req.body;
  const {user} = req;
  console.log(user);
  requestObject.createdBy = req.user.id;
  requestObject.password = 'addedByUser';

  await insert(requestObject , req.user.id);
  res.send({ message: responseMessages.recordAddSuccess });
}





async function editUser(req, res) {
  const { password, ...user } = req.body;
  if (password && !authHelper.validatePassword(password)) {
    res.status(422).json({ message: responseMessages.invalidPasswordFormat });
    return;
  }
  if (password) {
    user.salt = authHelper.generateRandomSalt();
    user.password = bcrypt.hashSync(password + user.salt, 10);
   
  }
  const userRef = await userService.findOne({ where: { id: user.id } });
  if (!userRef) {
    res
      .status(404)
      .send({
        message: responseMessages.notFound.replace(
          '?',
          'User not registered or'
        ),
      });
    return;
  }
  const statusObj = {
    approved: 1,
    pending: 0,
    disabled: 2,
  };
  user.status != undefined ? user.status = statusObj[user.status.toLowerCase()] || 3 : null;
  user.updated_at = new Date()
  await userRef.update(user);
  res.send({ message: responseMessages.recordUpdateSuccess });
}






async function register(req, res) {
  const password = "Jmb@123#inact"
  const requestObject = req.body;
  if (!authHelper.validatePassword(password)) {
    res.status(422).json({ message: responseMessages.invalidPasswordFormat });
    return;
  }
  requestObject.passwordResetToken = authHelper.generateResetToken(64);
  //requestObject.passwordResetTokenSentTime = new Date();
  await insert(requestObject);
  res.send({ message: responseMessages.recordAddSuccess });
}




async function login(req, res) {
  const { user } = req;
  delete user.password;
  delete user.salt;
  const token = authHelper.generateToken(user);
  authHelper.setTokenCookie(res, authHelper.generateToken(user));
  // authHelper.setCloudFrontSignedCookie(res);
  res.json({ user, token });
}






async function loginSocial(req, res) {
  const { email, source, socialId, firstName } = req.body;

  if (
    !['facebook', 'google', 'twitter', 'microsoft'].includes(source) ||
    !socialId
  ) {
    res.status(422).send({ message: responseMessages.invalidSocial });
    return;
  }

  let user = await userService.findOne({
    where: {
      [Op.or]: [
        {
          email,
        },
        {
          [`${source}Id`]: socialId,
        },
      ],
    },
  });

  if (!user) {
    // add user and send email
    const requestObject = {
      firstName: firstName || '',
      email,
      [`${source}Id`]: socialId,
      password: Math.random().toString(36).substring(8),
    };
    user = await insert(requestObject);

    res.send({ message: responseMessages.recordUpdateSuccess });
    return;
  }
  await user.update({ [`${source}Id`]: socialId });
  user = await user.get({ plain: true });
  delete user.password;
  delete user.salt;
  const token = authHelper.generateToken(user);
  authHelper.setTokenCookie(res, authHelper.generateToken(user));
  res.json({ user, token });
}





async function listUsers(req, res) {
  const { limit, offset } = req.pagination;
  const { user_name, first_name, email, role, status } = req.query;
  const object = {
    first_name,
    user_name,
    email,
    role,
    status,
  };
  const where = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const field of Object.keys(object)) {
    if (object[field]) where[field] = { [Op.like]: `%${object[field]}%` };
  }
  const users = await userService.findWhere({ where, offset, limit });
  const usersPlain = JSON.parse(JSON.stringify(users));
  let userResponse = [];
  usersPlain.forEach(user => {
    let temp = user;
    delete temp.password;
    delete temp.salt;
    delete temp.passwordAttemptsCount;
    delete temp.passwordAttemptTime;
    delete temp.passwordResetToken;
    delete temp.passwordResetTokenSentTime;
    userResponse.push(temp);
  })
  res.json({ userResponse });
}





async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await userService.findOne({ where: { email } });
  if (user) {
    const token = authHelper.generateResetToken(64);
    user
      .update({
        passwordResetToken: token,
        passwordResetTokenSentTime: new Date(),
      })
      .then(() => {
        console.log(authHelper.getResetPasswordLink(token, "reset"))
        sendEmail(
          email,
          responseMessages.passwordResetRequested,
          `click the link to reset password <a href="${authHelper.getResetPasswordLink(token, "reset")}">Reset Password</a>`
        );
      });
  }
  res.send({ message: responseMessages.passwordResetRequestSent });
}





async function resetPassword(req, res) {
  const { token, password } = req.body;
  const tmptoken = token.split('.');
  const hash = tmptoken[1];

  const user = await userService.findOne({
    where: { passwordResetToken: tmptoken[0] },
  });
  if (
    !user ||
    dayjs(user.passwordResetTokenSentTime).add(30, 'minutes') < new Date()
  ) {
    res
      .status(422)
      .send({ message: responseMessages.passwordResetTokenInvalid });
    return;
  }
  if (!authHelper.validatePassword(password)) {
    res.status(422).json({ message: responseMessages.invalidPasswordFormat });
    return;
  }
  const salt = authHelper.generateRandomSalt();
  const updateData = {
    salt,
    passwordResetToken: null,
    password: bcrypt.hashSync(password + salt, 10),
    passwordResetTokenSentTime: null,
    passwordAttemptsCount: 0,
    password_changed_at:new Date(),
  };
  let newUser = false;
  if (hash && hash === '9CD599A3523898E6A12E13EC787DA50A') {
    newUser = true;
    updateData.status = 1;
  }
  updateData.terms_accepted = 1;
  await user.update(updateData);
  res.send({ message: responseMessages.passwordChangeSuccess, newUser });
}

async function updateStatus(req, res) {
  const allowedStatuses = {
    pending: 0,
    approved: 1,
    disabled: 2,
  };
  const { status } = req.params;
  const { users } = req.body;

  await userService.update(
    { status: allowedStatuses[status] },
    {
      where: {
        id: users,
      },
    }
  );
  res.send({ message: responseMessages.recordUpdateSuccess });
}

async function deleteUsers(req, res) {
  const actor = req.user;
  const { users } = req.body;

  await userService.update(
    {
      deletedAt: new Date(),
      deletedBy: actor.id,
    },
    {
      where: {
        id: users,
      },
    }
  );
  res.send({ message: responseMessages.recordDeleteSuccess });
}

async function getOneByID(req, res) {
  const { id } = req.params;
  let user = await userService.findOne({
    where: { id },
    attributes: ['first_name', 'last_name', 'user_name', 'photo_url', 'bio' , "default_home_page_view"]
  })
  res.send(user)
}

async function getUserGroup(req, res) {
  const { user } = req;
  
  let userGroup = await userGroupService.getOneByID({
    where: { user_id:user.id },
    attributes: ['group_id']
  })
  res.send(userGroup)

}

async function getUserGroupById(req, res) {
  const { user_id } = req.body;
  
  let userGroup = await userGroupService.getOneByID({
    where: { user_id },
    attributes: ['group_id']
  })
  res.send(userGroup)

}

async function addUserSocket(user_id, socket_id) {
  let data = {
    user_id, socket_id
  };
  console.log(data);
  let socket = await socketService.add(data)
  return socket;
}

async function addWindowSocket(user_id, socket_id) {

  let data = {
    user_id, socket_id, created_at: new Date()
  };
  //console.log(data);
  let socket = await socketService.findOrCreate({ where: data })
  return socket;

}

async function removeUserSocket(socket_id) {

  let socket = await socketService.deleteOne({ socket_id })
  return socket;
}

async function removeAllUserSockets(user_id) {

  let socket = await socketService.deleteOne({ user_id })
  return socket;
}

async function removeAllSockets() {

  let socket = await socketService.emptyTable()
  return socket;
}