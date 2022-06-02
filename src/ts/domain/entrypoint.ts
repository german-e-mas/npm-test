/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

/**
 * Entrypoint describes the specification of the .gazebo-ci.yml entrypoint file. This file is used to configure
 * simulation launches with specific configuration.
 */
export interface Entrypoint {
  /**
   * Name defines the name of the robot that is under test or any other relevant information about the
   * test itself.
   */
  name: string;
  /** Image contains a valid OCI image URI. */
  image: string;
  /** Scenario contains the path to the scenario file from the root folder of the repository. */
  scenario: string;
}

function createBaseEntrypoint(): Entrypoint {
  return { name: "", image: "", scenario: "" };
}

export const Entrypoint = {
  encode(
    message: Entrypoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.image !== "") {
      writer.uint32(18).string(message.image);
    }
    if (message.scenario !== "") {
      writer.uint32(26).string(message.scenario);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entrypoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntrypoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.image = reader.string();
          break;
        case 3:
          message.scenario = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Entrypoint {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      image: isSet(object.image) ? String(object.image) : "",
      scenario: isSet(object.scenario) ? String(object.scenario) : "",
    };
  },

  toJSON(message: Entrypoint): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.image !== undefined && (obj.image = message.image);
    message.scenario !== undefined && (obj.scenario = message.scenario);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Entrypoint>, I>>(
    object: I
  ): Entrypoint {
    const message = createBaseEntrypoint();
    message.name = object.name ?? "";
    message.image = object.image ?? "";
    message.scenario = object.scenario ?? "";
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
