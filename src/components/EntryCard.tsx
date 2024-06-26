import { DragEvent, FC } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Entry } from "@/interfaces";
import { useUIContext } from "@/context/ui-context";
import { getFormatDistanceToNow } from "@/lib";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { toggleDragging } = useUIContext();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);
    toggleDragging(true);
  };

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    toggleDragging(false);
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
