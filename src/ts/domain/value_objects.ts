/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

/**
 * Copyright (C) 2022 Open Source Robotics Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** SHA is a Commit identifier. It's used across different services to refer to a specific commit. */
export interface SHA {
  /** Sha contains the SHA value. */
  sha: string;
}

/**
 * GroupID is a Simulation identifier. It's used across different services when they need to refer
 * to a specific Simulation.
 */
export interface GroupID {
  /** GroupId contains the group id value. */
  groupId: string;
}

function createBaseSHA(): SHA {
  return { sha: "" };
}

export const SHA = {
  encode(message: SHA, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sha !== "") {
      writer.uint32(10).string(message.sha);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SHA {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSHA();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sha = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SHA {
    return {
      sha: isSet(object.sha) ? String(object.sha) : "",
    };
  },

  toJSON(message: SHA): unknown {
    const obj: any = {};
    message.sha !== undefined && (obj.sha = message.sha);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SHA>, I>>(object: I): SHA {
    const message = createBaseSHA();
    message.sha = object.sha ?? "";
    return message;
  },
};

function createBaseGroupID(): GroupID {
  return { groupId: "" };
}

export const GroupID = {
  encode(
    message: GroupID,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== "") {
      writer.uint32(10).string(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupID {
    return {
      groupId: isSet(object.groupId) ? String(object.groupId) : "",
    };
  },

  toJSON(message: GroupID): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = message.groupId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupID>, I>>(object: I): GroupID {
    const message = createBaseGroupID();
    message.groupId = object.groupId ?? "";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
