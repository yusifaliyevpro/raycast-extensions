import { Action, ActionPanel, Icon, Keyboard, List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useState } from "react";
import { getAnnouncementContent, getAnnouncements } from "./data/announcement";
import { useLmsQuery } from "@/lib/use-lms-query";
import { LMS_BASE_URL } from "@/lib/constants";

export default function Command() {
  const { isLoading, data: announcements, revalidate } = useLmsQuery(getAnnouncements, []);
  const [selectedId, setSelectedId] = useState<string>();

  const { data: content, isLoading: isContentLoading } = useCachedPromise(getAnnouncementContent, [selectedId ?? ""], {
    execute: !!selectedId,
  });

  return (
    <List
      isLoading={isLoading}
      isShowingDetail={!!announcements?.length}
      onSelectionChange={(id) => id && setSelectedId(id)}
      navigationTitle="Search Announcements"
      searchBarPlaceholder="Search AzTU LMS Announcements"
    >
      {announcements?.map((item) => (
        <List.Item
          key={item.id}
          id={item.id}
          icon={Icon.Bell}
          title={item.title}
          detail={
            <List.Item.Detail
              isLoading={isContentLoading}
              markdown={`# ${item.title}\n\n${content?.content ?? "_Select to load…_"}`}
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label title="Author" text={item.creator} icon={Icon.Person} />
                  <List.Item.Detail.Metadata.Label title="Published" text={item.created_at} icon={Icon.Calendar} />
                  <List.Item.Detail.Metadata.Label title="Views" text={item.hit} icon={Icon.Eye} />
                </List.Item.Detail.Metadata>
              }
            />
          }
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open in LMS" url={`${LMS_BASE_URL}/announcements/${item.id}`} />
              <Action.CopyToClipboard title="Copy Title" content={item.title} />
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
      <List.EmptyView icon={Icon.Bell} title="No Announcements" description="No announcements found." />
    </List>
  );
}
