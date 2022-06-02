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

/**
 * Trigger is an action that represents that a certain event occurred in a test.
 * Triggers are usually user-defined.
 */
export interface Trigger {
  /** Name is the name of the trigger. */
  name: string;
  /** Pass contains true if the trigger passed, false otherwise. */
  pass: boolean;
}

function createBaseTrigger(): Trigger {
  return { name: "", pass: false };
}

export const Trigger = {
  encode(
    message: Trigger,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.pass === true) {
      writer.uint32(16).bool(message.pass);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Trigger {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrigger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.pass = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Trigger {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      pass: isSet(object.pass) ? Boolean(object.pass) : false,
    };
  },

  toJSON(message: Trigger): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.pass !== undefined && (obj.pass = message.pass);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Trigger>, I>>(object: I): Trigger {
    const message = createBaseTrigger();
    message.name = object.name ?? "";
    message.pass = object.pass ?? false;
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
