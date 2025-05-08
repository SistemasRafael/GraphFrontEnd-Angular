import { Result } from "./Result";

 export function isString(value: any): Result<boolean | undefined> {
    return new Result(value instanceof String || typeof value === "string");
}