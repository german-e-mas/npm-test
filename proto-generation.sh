# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts_proto"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./ts-proto-gen"

protoc \
    --plugin="${PROTOC_GEN_TS_PATH}" \
    --ts_proto_out="${OUT_DIR}" \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_opt=env=browser \
    --ts_proto_opt=exportCommonSymbols=false \
    -I ./api $(find ./api/domain -iname "*.proto")
