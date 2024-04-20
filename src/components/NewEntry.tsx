import { ChangeEvent, useState } from "react";
import { useUIContext } from "@/context/ui-context";
import { useEntriesContext } from "@/context/entries-context";
import { Box, Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const NewEntry = () => {
  const { setIsAddingEntry, isAddingEntry } = useUIContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const { createNewEntry } = useEntriesContext();

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return false;
    createNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue("");
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New Entry"
            autoFocus
            multiline
            label="New Entry"
            helperText={inputValue.length <= 0 && touched && "Add a new entry"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          ></TextField>
          <Box display="flex" justifyContent="space-around">
            <Button
              onClick={() => setIsAddingEntry(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddCircleIcon />}
          fullWidth
          variant="outlined"
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};

export default NewEntry;
