import React from "react";
import { WSToolTip ,WSSwitch } from "src/component/common";
import "../../less/common.module.less";

interface Props {
  onClick?: (e: boolean) => void;
  loading?: boolean;
  id?: string;
  idtoMutate?: string;
  checked?: boolean;
}

const ToggleComponent = (props: Props) => {
  const {
    onClick,
    loading,
    id,
    idtoMutate,
    checked,
  } = props;

  return (
    <div className="tooglebtn">
      <WSToolTip title={`${checked ? "Blocked" : "Un-Blocked"}`}>
        <WSSwitch
          // disabled={(ifDisabled && checked) || (toogle && checked)} TODO:Need this code
          loading={loading && id === idtoMutate}
          onClick={onClick}
          checked={checked}
        />
      </WSToolTip>
    </div>
  );
};

export default ToggleComponent;
