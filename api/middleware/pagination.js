function pagination(req, res, next) {
    let { count, pageNo } = req.query;

    if (!count) { count = 10; }
    count = +count;

    if (!pageNo) { pageNo = 1; }

    const offset = (pageNo - 1) * count;

    req.pagination = {
        offset, count,
    };
    next();
}

module.exports = pagination;
