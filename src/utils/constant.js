
const buttonActionType = {
    ADD: 1,
    EDIT: 1 << 1,
    DELETE: 1 << 2,
    IMPORT: 1 << 3,
    EXPORT: 1 << 4,
    AUDIT: 1 << 5,
    UNAUDIT: 1 << 6,
    GOODS_AUDIT: 1 << 7,
    UNGOODS_AUDIT: 1 << 8,
    FINACE_AUDIT: 1 << 9,
    UNFINACE_AUDIT: 1 << 10,
    PRINT: 1 << 11,
    UNPRINT: 1 << 12,
    SEND: 1 << 13,
    BATCH_ADD: 1 << 14,
    BATCH_EDIT: 1 << 15,
    CREATE_ROLEUSER : 1<<16,    
    ROLE_PERMIT : 1<<17
}

export default {
    actionType : buttonActionType
}