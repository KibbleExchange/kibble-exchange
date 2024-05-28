import { Select } from "antd";
import { SelectContainer } from "./styled";
import arrow from "../../../assets/Dashboard/Common/arrow.svg";

const { Option } = Select;

const SelectCommon = ({ data, onChange, defaultValue }: any) => {
  return (
    <SelectContainer>
      <Select
        suffixIcon={<img src={arrow} alt="arrow" />}
        placeholder="Please select value"
        defaultValue={defaultValue ? defaultValue : data[0].title}
        style={{ width: "100%" }}
        onChange={onChange}
        virtual={false}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      >
        {data.map((item: any, index: number) => (
          <Option key={index} value={item.title} label={item.title}>
            <div>
              {item.img === "" ? (
                ""
              ) : (
                <img width={32} height={32} src={item.img} alt="icon" />
              )}
              <p className="select-text">{item.title}</p>
            </div>
          </Option>
        ))}
      </Select>
    </SelectContainer>
  );
};

export default SelectCommon;
