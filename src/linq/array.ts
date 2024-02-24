import {
    COUNT_FUNCTION,
    FIRST_FUNCTION,
    LAST_FUNCTION,
    SELECT_FUNCTION,
    SELECT_MANY_FUNCTION,
    UNTIL_FUNCTION,
    WHERE_FUNCTION,
    count,
    first,
    last,
    select,
    selectMany, until,
    where
} from '../index';

Array.prototype.select = function <R>(cb: SELECT_FUNCTION<any, R>): R[] {
    return select(cb, this);
};

Array.prototype.selectMany = function <R>(cb: SELECT_MANY_FUNCTION<any, R>): R[] {
    return selectMany(cb, this);
};

Array.prototype.where = function(cb: WHERE_FUNCTION<any>): any[] {
    return where(cb, this);
};

Array.prototype.until = function(cb: UNTIL_FUNCTION<any>): any[] {
    return until(cb, this);
};

Array.prototype.count = function(cb: COUNT_FUNCTION<any>): number {
    return count(cb, this);
};

Array.prototype.first = function(cb?: FIRST_FUNCTION<any>): any | null {
    return first(cb ?? null, this);
};

Array.prototype.last = function(cb?: LAST_FUNCTION<any>): any | null {
    return last(cb ?? null, this);
};


export {};