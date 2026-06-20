import { Action, ActionPanel, Detail } from "@raycast/api";
import { getSyllabus } from "@/data/lecture/about";
import { useLmsQuery } from "@/lib/use-lms-query";

export function About({ lectureId }: { lectureId: string }) {
  const { data: syllabus, isLoading } = useLmsQuery(getSyllabus, [lectureId]);

  const data = syllabus?.[0];
  const plan = data?.lecture_plan?.[0];

  const createMarkdown = (): string => {
    let markdown = `# ${data?.lecture_name}\n\n`;
    markdown += `**Semester:** ${data?.semester}\n\n`;

    // Basic Info
    markdown += `## Lecture Information\n\n`;
    markdown += `| Property | Value |\n`;
    markdown += `|----------|-------|\n`;
    markdown += `| **Credit** | ${data?.score} |\n`;
    markdown += `| **Hours** | ${data?.hours} |\n`;
    markdown += `| **Week** | ${data?.week} |\n`;
    markdown += `| **Students** | ${data?.student_count} |\n\n`;

    // Professors
    markdown += `## Professors\n\n`;
    if (data?.professor?.lecture_professor_name) {
      markdown += `- **Lecture:** ${data.professor.lecture_professor_name}\n`;
    }
    if (data?.professor?.training_professor_name) {
      markdown += `- **Practice:** ${data.professor.training_professor_name}\n`;
    }
    if (data?.professor?.laboratory_professor_name) {
      markdown += `- **Laboratory:** ${data.professor.laboratory_professor_name}\n`;
    }
    markdown += `\n`;

    // Objective
    if (plan?.object) {
      markdown += `## Course Objective\n\n`;
      markdown += `${plan.object}\n\n`;
    }

    // Teaching Method
    if (plan?.teaching_method) {
      markdown += `## Teaching Method\n\n`;
      markdown += `${plan.teaching_method}\n\n`;
    }

    // Scores Distribution
    if (plan?.scores) {
      markdown += `## Assessment\n\n`;
      markdown += `| Component | Score |\n`;
      markdown += `|-----------|-------|\n`;
      if (plan.scores.lecture_score) {
        markdown += `| Independent Work | ${plan.scores.lecture_score} |\n`;
      }
      if (plan.scores.training_score) {
        markdown += `| Practice | ${plan.scores.training_score} |\n`;
      }
      if (plan.scores.laboratory_score) {
        markdown += `| Laboratory | ${plan.scores.laboratory_score} |\n`;
      }
      markdown += `| **Attendance** | **${plan.scores.attend_percent}** |\n`;
      if (plan.scores.middle_percent !== "0") {
        markdown += `| **Midterm** | **${plan.scores.middle_percent}** |\n`;
      }
      markdown += `| **Final Exam** | **${plan.scores.last_percent}** |\n`;
    }

    return markdown;
  };

  const markdown = data ? createMarkdown() : "";

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      navigationTitle="About"
      actions={
        data && (
          <ActionPanel>
            <Action.CopyToClipboard title="Copy as Markdown" content={markdown} />
          </ActionPanel>
        )
      }
    />
  );
}
