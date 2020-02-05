/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ITokenClaims, IUser, ScopeType } from "@microsoft/fluid-protocol-definitions";
import * as jwt from "jsonwebtoken";
import { debug } from "util";
// tslint:disable-next-line:no-submodule-imports
import * as uuid from "uuid/v4";
import { getRandomName } from "./dockerNames";

/**
 * Generates a JWT token to authorize routerlicious
 */
export function generateToken(
    tenantId: string,
    documentId: string,
    key: string,
    scopes: ScopeType[],
    user?: IUser): string {
    user = (user) ? user : generateUser();
    if (user.id === "" || user.id === undefined) {
        debug("User with no id");
        user = generateUser();
    }

    const claims: ITokenClaims = {
        documentId,
        scopes,
        tenantId,
        user,
    };

    return jwt.sign(claims, key);
}

export function generateUser(): IUser {
    const randomUser = {
        id: uuid(),
        name: getRandomName(" ", true),
    };

    return randomUser;
}