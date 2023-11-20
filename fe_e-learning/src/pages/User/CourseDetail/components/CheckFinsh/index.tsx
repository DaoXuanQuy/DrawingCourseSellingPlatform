import { Checkbox } from 'antd';

interface Props {
  isChecked: boolean;
  isDisable?: boolean;
}

export default (props: Props): JSX.Element => {
  const { isChecked, isDisable } = props;
  return (
    <>
      <Checkbox
        checked={isChecked}
        disabled={isDisable ? isDisable : false}
        style={{ color: '#1677ff' }}
      >
        <span style={{ color: '#1677ff' }}>Đã xong</span>
      </Checkbox>
    </>
  );
};
