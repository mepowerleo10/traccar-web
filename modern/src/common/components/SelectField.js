import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useEffectAsync } from '../../reactHelper';

const SelectField = ({
  margin,
  variant,
  label,
  multiple,
  value,
  emptyValue = 0,
  emptyTitle = '\u00a0',
  onChange,
  endpoint,
  data,
  keyGetter = (item) => item.id,
  titleGetter = (item) => item.name,
}) => {
  const [items, setItems] = useState(data);

  useEffectAsync(async () => {
    if (endpoint) {
      const response = await fetch(endpoint);
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    }
  }, []);

  if (items) {
    return (
      <FormControl margin={margin} variant={variant}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple={multiple}
          value={value}
          onChange={onChange}
        >
          {!multiple && emptyValue !== null
            && <MenuItem value={emptyValue}>{emptyTitle}</MenuItem>}
          {items.map((item) => (
            <MenuItem key={keyGetter(item)} value={keyGetter(item)}>{titleGetter(item)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return null;
};

export default SelectField;
