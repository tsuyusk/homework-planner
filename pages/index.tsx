import React, { useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import { Flex, Text, Checkbox, IconButton, Button, Textarea, Box } from "@chakra-ui/core";

import useStorageState from "../hooks/useStorageState";

interface Week {
  id: string;
  label: string;
  isDone: boolean;
}

interface Subject {
  id: string;
  title: string;
  isDone: boolean;
  isShown: boolean;
  weeks: Week[];
}

const Home: React.FC = () => {
  const noteTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [note, setNote] = useStorageState<string>(
    '',
    "@HomeworkPlanner/note_ver_2",
  );

  const [subjects, setSubjects] = useStorageState<Subject[]>(
    [],
    "@HomeworkPlanner/subjects_ver_2"
  );

  useEffect(() => {
    if (subjects.length === 0) {
      fetch("/api/subjects")
        .then((response) => response.json())
        .then((data) => {
          setSubjects(data);
        });
    }

    if (note.length !== 0) {
      if (noteTextAreaRef.current) {
        const { scrollHeight } = noteTextAreaRef.current;

        if (scrollHeight > 348) {
          noteTextAreaRef.current.scrollTop = scrollHeight;
        }
      }
    }
  }, [subjects, note]);

  const toggleCheckTitleCheckbox = useCallback((index: number) => {
    setSubjects(state => {
      const subject = state[index];

      subject.isDone = !subject.isDone;

      return [...state];
    });
  }, []);

  const toggleCheckWeekCheckbox = useCallback(
    (subjectIndex: number, weekIndex: number) => {
      setSubjects(state => {
        const selectedWeek = state[subjectIndex].weeks[weekIndex];

        selectedWeek.isDone = !selectedWeek.isDone;

        return [...state];
      });
    },
    [],
  );

  const handleToggleSubject = useCallback(
    (index: number) => {
      setSubjects(state => {
        const subject = state[index];

        subject.isShown = !subject.isShown;

        return [...state];
      });
    },
    [],
  );

  const handleReset = useCallback(() => {
    fetch("/api/subjects")
      .then(response => response.json())
      .then(data => {
        setSubjects(data);
      });
  }, []);

  return (
    <Flex
      padding="10px"
      width="100%"
      height="100%"
      align="center"
      justify="center"
      as="main"
    >
      <Head>
        <title>Organizador para PET</title>
      </Head>

      <Flex
        height="100%"
        width="600px"
        margin={["0 auto"]}
        align="center"
        justify="center"
        flexDir="column"
      >
        <Button
          onClick={handleReset}
          marginBottom="12px"
        >
          Resetar
        </Button>
        {subjects.map((subject, subjectIndex) => (
          <Flex
            marginTop="20px"
            width="100%"
            padding="18px 4px"
            align="center"
            flexDir="column"
            justify="center"
            key={subject.id}
          >
            <Flex
              position="relative"
              bg="gray.100"
              align="center"
              width="82%"
              padding="12px 8px"
            >
              <Checkbox
                bg="white"
                marginRight="10px"
                isChecked={subject.isDone}
                onChange={() => toggleCheckTitleCheckbox(subjectIndex)}
              />
              <Text
                textDecoration={subject.isDone && "line-through"}
                fontWeight="500"
                fontSize="xl"
              >
                {subject.title}
              </Text>
              <IconButton
                aria-label="hide subject"
                position="absolute"
                right="0"
                top="0"
                icon={subject.isShown ? "small-close" : "chevron-down"}
                onClick={() => handleToggleSubject(subjectIndex)}
              />
            </Flex>
            {subject.isShown && (
              <Flex
                bg="gray.50"
                justify="space-around"
                width="80%"
                align="center"
                flexDir="column"
                padding="8px 0"
                min-height="130px"
              >
                {subject.weeks.map((week, weekIndex) => (
                  <Flex
                    marginTop={weekIndex !== 0 && "16px"}
                    marginBottom={
                      weekIndex === 3 && "16px"
                      || weekIndex === 7 && "16px"
                    }
                    width="80%"
                    display="flex"
                    key={week.id}
                  >
                    <Checkbox
                      onChange={() =>
                        toggleCheckWeekCheckbox(subjectIndex, weekIndex)
                      }
                      isChecked={subject.isDone || week.isDone}
                      marginRight="10px"
                    />
                    <Text
                      textDecoration={
                        (subject.isDone && "line-through") ||
                        (week.isDone && "line-through")
                      }
                    >
                      {week.label}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
        ))}

        <Flex
          marginTop="20px"
          width="100%"
          padding="18px 4px"
          align="center"
          flexDir="column"
          justify="center"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '82%',
            }}
          >
            <Flex
              background="#fff"
              width="100%"
              flexDir="column"
              align="flex-start"
            >
              <Text
                fontWeight="500"
                fontSize="xl"
                marginBottom="12px"
              >
                Anotações
              </Text>
              <Textarea
                ref={noteTextAreaRef}
                value={note}
                onChange={(event: any) => setNote(event.target.value)}
                height="350px"
              />
            </Flex>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
