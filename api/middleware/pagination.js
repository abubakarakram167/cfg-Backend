function pagination(req, res, next) {
    let { _count, _pageNo } = req.query;

    if (!_count) { _count = 10; }
    _count = +_count;

    if (!_pageNo) { _pageNo = 1; }

    const offset = (_pageNo - 1) * _count;

    req.pagination = {
        offset, limit: _count,
    };
    next();
}

module.exports = pagination;
