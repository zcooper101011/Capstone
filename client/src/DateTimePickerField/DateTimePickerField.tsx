import { useField, useFormikContext } from "formik";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "./datetimepicker.css";

interface Props {
  name: string;
  [key: string]: any;
}
const DateTimePickerField: React.FC<Props> = ({ name, ...props }) => {
  const { setFieldValue, errors, values } = useFormikContext<any>();
  const [field] = useField(name);

  function getClassName(): string | undefined {
    if (errors[name]) {
      return 'invalid-datetime-picker'
    } else if (values[name]) {
      return 'valid-datetime-picker';
    }

    return undefined;
  }

  return (
    <div>
      <DateTimePicker
        {...props}
        {...field}
        disableClock={true}
        onChange={(val) => {
          console.log("val", val);
          setFieldValue(field.name, val);
        }}
        className={getClassName()}
      />
      {errors[name] && (<div className="datepicker-invalid-feedback">{errors[name] as string}</div>)}
    </div>
  );
};

export default DateTimePickerField;
