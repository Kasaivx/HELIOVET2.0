import * as bcrypt from "bcrypt";
export async function hashpswd(Password) {
    return await bcrypt.hash(Password, 10);
}
;
export async function hashcomp(Password, hash) {
    return await bcrypt.compare(Password, hash);
}
//# sourceMappingURL=hash.service.js.map