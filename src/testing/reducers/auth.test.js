import authReducer from "../../reducers/auth";

test("should set login uid in state", () => {
  const uid = "random1234";
  const action = {
    type: "LOGIN",
    uid,
  };
  const result = authReducer(undefined, action);
  expect(result).toEqual({ uid });
});

test("should logout clear state", () => {
  const action = {
    type: "LOGOUT",
  };
  const result = authReducer({ uid: "something" }, action);
  expect(result).toEqual({});
});
