import { List, ActionPanel, Action, Icon, Keyboard } from "@raycast/api";
import { getTotalScores } from "./data/scores/getScores";
import SemesterDetail from "./components/semester-details";
import { useLmsQuery } from "@/lib/use-lms-query";

export default function Command() {
  const { isLoading, data: totalScores, revalidate } = useLmsQuery(getTotalScores, []);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search semesters...">
      {totalScores?.results.map((semester) => (
        <List.Item
          key={semester.sem_code}
          title={semester.semester_name}
          accessories={[
            {
              text: `${semester.total_score} / ${semester.require_score} credit`,
              tooltip: "Earned Credits",
            },
            { text: `${semester.avg_total2}`, tooltip: "Average Score" },
          ]}
          subtitle={`Subjects: ${semester.require_cnt}, Attended: ${semester.attend_cnt}`}
          actions={
            <ActionPanel>
              <Action.Push title="View Semester Details" target={<SemesterDetail semCode={semester.sem_code} />} />
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

      {totalScores?.summary && (
        <List.Section title="Overall Summary">
          <List.Item
            title="Total Credits"
            accessories={[{ text: `${totalScores.summary.t_require_score}` }]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard
                  title="Copy"
                  content={"Total Credits: " + totalScores.summary.t_require_score}
                />
              </ActionPanel>
            }
          />
          <List.Item
            title="Average Score (GPA)"
            accessories={[{ text: `${totalScores.summary.t_avg_total.toFixed(1)}` }]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard
                  title="Copy"
                  content={"Average Score (GPA): " + totalScores.summary.t_avg_total.toFixed(1)}
                />
              </ActionPanel>
            }
          />
          <List.Item
            title="Attended Subjects"
            accessories={[{ text: `${totalScores.summary.t_attend_cnt} / ${totalScores.summary.t_require_cnt}` }]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard
                  title="Copy"
                  content={
                    "Attended Subjects: " + `${totalScores.summary.t_attend_cnt} / ${totalScores.summary.t_require_cnt}`
                  }
                />
              </ActionPanel>
            }
          />
        </List.Section>
      )}

      <List.EmptyView
        icon={Icon.ExclamationMark}
        title="No Data Found"
        description="Semester data could not be loaded."
      />
    </List>
  );
}
