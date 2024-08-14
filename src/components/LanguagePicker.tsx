import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { getLanguages } from '@/api/getLanguages';

type Status = 'initial' | 'loading' | 'success' | 'error';

interface LanguagePickerProps {
  onChange: (event: React.SyntheticEvent, value: string[]) => void;
}

export function LanguagePicker({ onChange }: LanguagePickerProps) {
  const [status, setStatus] = useState<Status>('initial');
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setStatus('loading');
        const languages = await getLanguages();
        setOptions(languages.map((language) => language.name));
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchLanguages();
  }, []);

  return (
    <Autocomplete
      multiple
      size="small"
      disabled={status === 'loading'}
      options={options}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Languages"
          placeholder="Choose languages"
        />
      )}
    />
  );
}
