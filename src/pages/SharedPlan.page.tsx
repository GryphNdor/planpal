import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';
import { Group, Title, Text, Grid, Container, Select, Textarea, Modal, Button, Dialog, FileButton, Stack, List, Checkbox, Input, Alert } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

const content = '<h1>Boxes! Colors!</h1> <p>What are these?</p>';

type Comment = {
  person: string;
  desc: string;
  date: string;
}

export default function SharedPlan() {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
    content,
  });
  const [value, setValue] = useState<Date | null>(null);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openTemplateModal, handleTemplateModal] = useDisclosure(false);
  const [openShareModal, handleShareModal] = useDisclosure(false);
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<Comment[]>([{
    person: "Bob",
    desc: "Hm needs work",
    date: new Date(2025, 3, 25).toLocaleDateString()
  }, {
    person: "Bob",
    desc: "Better, still dont know what a box is",
    date: new Date(2025, 3, 27).toLocaleDateString()
  }]);

  const [commentMsg, setCommentMsg] = useState('')

  const handleComment = () => {
    setComments(comments => {
        return [...comments, {
          person: 'Me',
          desc: commentMsg,
          date: new Date().toLocaleDateString()
        }]
    })
  }

  return (
    <Container fluid>
      <Group justify='space-between' align='center'>
        <Title order={1} mt={25} mb={15}>Shared Lesson Plan</Title>
        <Group>
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
            <Group>
              <Button size="compact-sm" onClick={() => handleTemplateModal.toggle()}>Add Comment</Button>
              <Button size="compact-sm" bg="secondary">Generate w/ AI</Button>
            </Group>
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
      <Modal opened={openTemplateModal} onClose={() => handleTemplateModal.close()} title="Comments" size="xl" centered>
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              {comments.map((item) => (
                <Alert variant="light" color="gray" title={`${item.person} - ${item.date}`}>
                  {item.desc} 
                </Alert>
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Text fw={700}>New Comment</Text>
              <Input onChange={(e) => setCommentMsg(e.target.value)}></Input>
    
              <Button onClick={handleComment}>Submit</Button>
            </Stack>
          </Grid.Col>
        </Grid>
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
