import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';
import { Group, Title, Text, Grid, Container, Select, Textarea, Modal, Button, Dialog, FileButton, Stack, List, Checkbox } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

const content = '<p>New Lesson plan!</p>';

export default function CreatePlan() {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
    content,
  });
  const [value, setValue] = useState<Date | null>(null);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openTemplateModal, handleTemplateModal] = useDisclosure(false);
  const [openShareModal, handleShareModal] = useDisclosure(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFill = () => {
    editor?.commands.setContent("<h2>🚀 Calculus is Cool!</h2><p> A derivative is a fundamental concept in calculus that measures how a function changes as its input changes. In simple terms, it tells you the rate of change or the slope of a function at any given point. Derivatives are used to understand motion, optimize systems, and model real-world change—whether it's calculating speed, analyzing trends in finance, or studying natural phenomena.</p>")

    handleTemplateModal.toggle()
  }

  const generateAI = async () => {
    const lines = [
      'Reading from your files...',
      '<h1>Lesson Plan: Introduction to Derivatives</h1>',
      '<p><strong>Grade Level:</strong> 11–12 / College Intro<br>',
      '<strong>Subject:</strong> Calculus<br>',
      '<strong>Topic:</strong> Derivatives – Concept and Basic Rules<br>',
      '<strong>Duration:</strong> 60 minutes',
      '</p>',
      '<hr><h2>Objectives</h2>',
      '<ul><li>Understand the definition of a derivative as the limit of the average rate of change.</li>',
      `<li>Use notation for derivatives: <code>f'(x)</code>, <code>dy/dx</code>, etc.</li>`,
      '<li>Apply basic differentiation rules (power, constant, sum/difference).</li>',
      '<li>Interpret the derivative graphically and in real-world contexts.</li></ul>\n\n',
      '<hr><h2>Materials Needed</h2>',
      '<ul><li>Whiteboard or digital whiteboard</li>',
      '<li>Graphing calculator or Desmos</li>',
      '<li>Student notebooks</li>',
      '<li>Handout with practice problems</li>',
      '<li><em>(Optional)</em> Interactive animation or video on tangent lines and limits</li></ul>',
      '<hr><h2>Lesson Structure</h2>',
      '<h3>1. Warm-Up (10 min)</h3>',
      `<ul><li><strong>Prompt:</strong> "If you drive 100 miles in 2 hours, what's your average speed? What if your speed keeps changing?"</li>`,
      '<li>Discuss the difference between <strong>average rate of change</strong> and <strong>instantaneous rate of change</strong>.</li>',
      '<li>Introduce the idea of a <strong>derivative as the slope of the tangent line</strong> at a point.</li>',
      '</ul>'
    ]
    for (let line of lines) {
      editor?.chain().focus().insertContent(`${line}\n`).run();
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return (
    <Container fluid>
      <Group justify='space-between' align='center'>
        <Title order={1} mt={25} mb={15}>Create Lesson Plan</Title>
        <Group>
          <Button size="compact-sm" onClick={() => handleTemplateModal.toggle()}>Import Template</Button>
          <Button size="compact-sm" onClick={() => handleShareModal.toggle()}>Share</Button>
          <Button size="compact-sm" onClick={toggle}>Save</Button>
        </Group>
      </Group>
      <Group pt='sm' pb='sm'>
        <Text size="lg">Class: </Text>
        <Select
          placeholder="Pick value"
          data={['Calculus', 'AP Biology', 'Calculus 2', 'Art', 'Geometry']}
        />
        <DateInput
          value={value}
          onChange={setValue}
          placeholder="Date input"
        />
      </Group>
      <Grid>
        <Grid.Col span={9}> 
          <Group justify='space-between'>
            <Title order={2}>Lesson Plan</Title>
            <Button size="compact-sm" bg="secondary" onClick={generateAI}>Generate w/ AI</Button>
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
            <FileButton onChange={setFiles} accept="image/png, application/pdf" multiple>
              {(props) => <Button {...props} size='compact-sm'>Upload Files</Button>}
            </FileButton>
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
            minRows={2}
            maxRows={10}
          />
        </Grid.Col>
      </Grid>
      <Dialog opened={opened} position={{ bottom: 20, right: 20 }} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" fw={500}>
          Saved! 
        </Text>
      </Dialog>
      <Modal opened={openTemplateModal} onClose={() => handleTemplateModal.close()} title="Import Online Lesson Template" centered>
        <Stack>
          <Button variant='light' onClick={handleFill}> Mrs. Pott's Calculus 1 - Derivatives </Button>
          <Button variant='light'> Art - Shapes and Boxes </Button>
          <Button variant='light'> Space! - What is a Planet? </Button>
        </Stack>
      </Modal>

      <Modal opened={openShareModal} onClose={() => handleShareModal.close()} title="Share My Lesson" centered>
        <Stack>
          <Checkbox defaultChecked label="Share Lesson Plan"/>
          <Checkbox label="Share Resource Files"/>
          <Checkbox label="Share Notes"/>
          <Button onClick={() => handleShareModal.close()}>Share</Button>
        </Stack>
      </Modal>
    </Container>
  );
}
