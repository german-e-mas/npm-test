/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Repository } from "../domain/repository";
import { Scenario } from "../domain/scenario";

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

/** Suite contains a group of scenario runs. */
export interface Suite {
  /** SHA is the head SHA that originated this suite. */
  SHA: string;
  /** Provider contains the name of the git provider that originated this suite. */
  provider: string;
  /** Repository contains information about the git repository that triggered this suite. */
  repository: Repository | undefined;
  /** Branch contains the branch that originated this suite. */
  branch: string;
  /** Scenarios contains information about each one of the scenarios that were run in this suite. */
  scenarios: Scenario[];
}

function createBaseSuite(): Suite {
  return {
    SHA: "",
    provider: "",
    repository: undefined,
    branch: "",
    scenarios: [],
  };
}

export const Suite = {
  encode(message: Suite, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SHA !== "") {
      writer.uint32(10).string(message.SHA);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    if (message.repository !== undefined) {
      Repository.encode(message.repository, writer.uint32(26).fork()).ldelim();
    }
    if (message.branch !== "") {
      writer.uint32(34).string(message.branch);
    }
    for (const v of message.scenarios) {
      Scenario.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Suite {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SHA = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        case 3:
          message.repository = Repository.decode(reader, reader.uint32());
          break;
        case 4:
          message.branch = reader.string();
          break;
        case 5:
          message.scenarios.push(Scenario.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Suite {
    return {
      SHA: isSet(object.SHA) ? String(object.SHA) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      repository: isSet(object.repository)
        ? Repository.fromJSON(object.repository)
        : undefined,
      branch: isSet(object.branch) ? String(object.branch) : "",
      scenarios: Array.isArray(object?.scenarios)
        ? object.scenarios.map((e: any) => Scenario.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Suite): unknown {
    const obj: any = {};
    message.SHA !== undefined && (obj.SHA = message.SHA);
    message.provider !== undefined && (obj.provider = message.provider);
    message.repository !== undefined &&
      (obj.repository = message.repository
        ? Repository.toJSON(message.repository)
        : undefined);
    message.branch !== undefined && (obj.branch = message.branch);
    if (message.scenarios) {
      obj.scenarios = message.scenarios.map((e) =>
        e ? Scenario.toJSON(e) : undefined
      );
    } else {
      obj.scenarios = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Suite>, I>>(object: I): Suite {
    const message = createBaseSuite();
    message.SHA = object.SHA ?? "";
    message.provider = object.provider ?? "";
    message.repository =
      object.repository !== undefined && object.repository !== null
        ? Repository.fromPartial(object.repository)
        : undefined;
    message.branch = object.branch ?? "";
    message.scenarios =
      object.scenarios?.map((e) => Scenario.fromPartial(e)) || [];
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
