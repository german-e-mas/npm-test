/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { Duration } from "../google/protobuf/duration";
import { Test } from "../domain/test";

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

/** Scenario groups a set of tests executed by the testing library. */
export interface Scenario {
  /** Name contains the name of the scenario. */
  name: string;
  /** Description contains the description of the test results. */
  description: string;
  /** StartTime is the time point, in UTC epoch time, that this tests started. */
  startTime: Date | undefined;
  /** Duration contains the duration that it took to run this tests. */
  duration: Duration | undefined;
  /**
   * PassCount contains the number of tests that passed. The count of tests can be used to
   * determine the number of failed tests, if need. For example:
   * `int failCount = tests_count() - pass_count()`.
   */
  passCount: number;
  /** Tests groups a set of tests executed by the testing library. */
  tests: Test[];
  /** GroupId is a unique identifier for the simulation instance that produced the test results. */
  groupId: string;
}

function createBaseScenario(): Scenario {
  return {
    name: "",
    description: "",
    startTime: undefined,
    duration: undefined,
    passCount: 0,
    tests: [],
    groupId: "",
  };
}

export const Scenario = {
  encode(
    message: Scenario,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(34).fork()).ldelim();
    }
    if (message.passCount !== 0) {
      writer.uint32(40).int32(message.passCount);
    }
    for (const v of message.tests) {
      Test.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.groupId !== "") {
      writer.uint32(58).string(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Scenario {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScenario();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.startTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.passCount = reader.int32();
          break;
        case 6:
          message.tests.push(Test.decode(reader, reader.uint32()));
          break;
        case 7:
          message.groupId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Scenario {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      startTime: isSet(object.startTime)
        ? fromJsonTimestamp(object.startTime)
        : undefined,
      duration: isSet(object.duration)
        ? Duration.fromJSON(object.duration)
        : undefined,
      passCount: isSet(object.passCount) ? Number(object.passCount) : 0,
      tests: Array.isArray(object?.tests)
        ? object.tests.map((e: any) => Test.fromJSON(e))
        : [],
      groupId: isSet(object.groupId) ? String(object.groupId) : "",
    };
  },

  toJSON(message: Scenario): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.startTime !== undefined &&
      (obj.startTime = message.startTime.toISOString());
    message.duration !== undefined &&
      (obj.duration = message.duration
        ? Duration.toJSON(message.duration)
        : undefined);
    message.passCount !== undefined &&
      (obj.passCount = Math.round(message.passCount));
    if (message.tests) {
      obj.tests = message.tests.map((e) => (e ? Test.toJSON(e) : undefined));
    } else {
      obj.tests = [];
    }
    message.groupId !== undefined && (obj.groupId = message.groupId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Scenario>, I>>(object: I): Scenario {
    const message = createBaseScenario();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.startTime = object.startTime ?? undefined;
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration.fromPartial(object.duration)
        : undefined;
    message.passCount = object.passCount ?? 0;
    message.tests = object.tests?.map((e) => Test.fromPartial(e)) || [];
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
