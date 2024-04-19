import { FC, useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "@/interfaces";
import { useEntriesContext } from "@/context/entries-context";
import { useUIContext } from "@/context/ui-context";
import { EntryCard } from "./EntryCard";

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList = ({ status }: EntryListProps) => {
  const { entries, updateEntry } = useEntriesContext();
  const { isDragging, toggleDragging } = useUIContext();

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    toggleDragging(false);
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const drawStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "10px",
    border: "1px dashed whitesmoke",
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      // className={isDragging ? styles.dragging : ""}
      style={isDragging ? drawStyles : undefined}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: 1,
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
