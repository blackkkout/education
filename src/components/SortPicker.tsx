import type { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface SortPickerProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  sortLabels: Record<string, string>;
}

export function SortPicker({ value, onChange, sortLabels }: SortPickerProps) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>Sort by</InputLabel>
      <Select label="Sort by" value={value} onChange={onChange}>
        {Object.keys(sortLabels).map((value) => (
          <MenuItem key={value} value={value}>
            {sortLabels[value]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
