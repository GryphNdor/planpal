import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';
import { Group, Title, Text, Grid, Container, Select, Textarea, Modal, Button, Dialog, FileButton, Stack, List, Checkbox } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';

const content = "<h2>🚀 Calculus is Cool!</h2><p> A derivative is a fundamental concept in calculus that measures how a function changes as its input changes. In simple terms, it tells you the rate of change or the slope of a function at any given point. Derivatives are used to understand motion, optimize systems, and model real-world change—whether it's calculating speed, analyzing trends in finance, or studying natural phenomena.</p>";

export default function ViewPlan() {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
    content,
    editable: false
  });
  const [value, setValue] = useState<Date | null>(new Date(2022, 1, 20));
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Container fluid>
      <Group justify='space-between' align='center'>
        <Title order={1} mt={25} mb={15}>Derivatives 2022</Title>
      </Group>
      <Group pt='sm' pb='sm'>
        <Text size="lg">Class: </Text>
        <Select
          placeholder="Pick value"
          value={'Calculus'}
          data={['Calculus', 'AP Biology', 'Calculus 2', 'Art', 'Geometry']}
        />
        <DateInput
          value={value}
          placeholder="Date input"
        />
      </Group>
      <Grid>
        <Grid.Col span={9}> 
          <Group justify='space-between'>
            <Title order={2}>Lesson Plan</Title>
          </Group>
          <RichTextEditor editor={editor} styles={{
            content: {
              maxHeight: 500, // or any height you want
              height: 500,
              overflowY: 'auto',
            },
          }} variant="subtle">
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group>
            <Title order={2}>Resources</Title>
          </Group>
          <List>
          {files.map((file, index) => (
            <List.Item key={index}>{file.name}</List.Item>
          ))}
          </List>
        </Grid.Col>
        <Grid.Col span={12}>
          <Title order={2}>Notes</Title>
          <Textarea
            placeholder="Extra Notes"
            autosize
            contentEditable={false}
            value={'Done :D'}
            minRows={2}
            maxRows={10}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
