import React from "react";
import { Col, Row } from "antd";
import { WSInput } from "src/component/common/Input/WSInput";
import { WSCard } from "src/component/common/card/WSCard";
import { WSButton } from "src/component/common/Button/WSButton";
import { WSFormItem } from "src/component/common/formItem/WSFormItem";
import { WSForm } from "src/component/common/form/WSForm";
import { WSPassword } from "src/component/common/password/WSPassword";
import { HeadElement } from "src/component/core/headElement";
import metaTitle from "src/utils/metaTitle";

interface loginForm {
  handleSubmit?: () => void;
  loading?: boolean;
}
const LoginHandlerForm: React.FC<loginForm> = (props: loginForm) => {
  const { handleSubmit, loading } = props;

  const onkeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.keyCode == 13 && handleSubmit();
  };
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };
  return (
    <>
      <HeadElement title={metaTitle.Login} />
      <div className="login-align">
        <WSCard title="Admin Login" className="title">
          <WSForm className="loginForm" {...layout} labelAlign="left">
            <Row className="row">
              <Col>
                <WSFormItem required label="Email Address">
                  <WSInput
                    name="email"
                    placeholder="Email Address"
                    onKeyDown={onkeyPress}
                  />
                </WSFormItem>
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <WSFormItem required label="Password">
                  <WSPassword
                    name="password"
                    onKeyDown={onkeyPress}
                    placeholder="Password"
                  />
                </WSFormItem>
              </Col>
            </Row>
            <div className="btn-login">
              <WSButton
                className="btn"
                loading={loading}
                type="primary"
                onClick={handleSubmit}
              >
                Login
              </WSButton>
            </div>
          </WSForm>
        </WSCard>
      </div>
    </>
  );
};

export default LoginHandlerForm;
