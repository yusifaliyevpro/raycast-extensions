import { Action, ActionPanel, Icon, Keyboard, List } from "@raycast/api";
import { getLectures } from "@/data/lectures";
import { useLmsQuery } from "@/lib/use-lms-query";
import { LMS_BASE_URL } from "@/lib/constants";
import { LectureOptionList } from "./components/lecture/lecture-options";

export default function Lectures() {
  const { data: lectures, isLoading, revalidate } = useLmsQuery(getLectures, []);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search Lectures...">
      {lectures?.map((lecture) => (
        <List.Item
          key={lecture.id}
          icon={Icon.Book}
          title={lecture.lecture_name}
          subtitle={lecture.class_num}
          actions={
            <ActionPanel>
              <Action.Push title="View Details" icon={Icon.Eye} target={<LectureOptionList lecture={lecture} />} />
              <Action.OpenInBrowser title="Open in LMS" url={`${LMS_BASE_URL}/lectures/${lecture.id}`} />
              <Action
                title="Refresh"
                icon={Icon.ArrowClockwise}
                onAction={revalidate}
                shortcut={Keyboard.Shortcut.Common.Refresh}
              />
            </ActionPanel>
          }
        />
      ))}
      <List.EmptyView
        icon={Icon.Book}
        title="No Lectures Found"
        description="You don't have any active lectures at the moment."
      />
    </List>
  );
}
