import React, { useEffect, useCallback } from "react";
import Head from "next/head";
import { Flex, Text, Checkbox, IconButton } from "@chakra-ui/core";

import useStorageState from "../hooks/useStorageState";

interface Subject {
  id: string;
  title: string;
  isDone: boolean;
  isShown: boolean;
  weeks: Array<{
    id: string;
    number: number;
    isDone: boolean;
  }>;
}

const Home: React.FC = () => {
  const [subjects, setSubjects] = useStorageState<Subject[]>(
    [],
    "@HomeworkPlanner/subjects"
  );

  useEffect(() => {
    if (subjects.length === 0) {
      fetch("/api/subjects")
        .then((response) => response.json())
        .then((data) => {
          setSubjects(data);
        });
    }
  }, []);

  const toggleCheckTitleCheckbox = useCallback(
    (index: number) => {
      const updatedSubjects = [...subjects];
      updatedSubjects[index].isDone = !updatedSubjects[index].isDone;

      setSubjects(updatedSubjects);
    },
    [subjects]
  );

  const toggleCheckWeekCheckbox = useCallback(
    (subjectIndex: number, weekIndex: number) => {
      const updatedSubjects = [...subjects];
      updatedSubjects[subjectIndex].weeks[weekIndex].isDone = !updatedSubjects[
        subjectIndex
      ].weeks[weekIndex].isDone;

      setSubjects(updatedSubjects);
    },
    [subjects]
  );

  const handleToggleSubject = useCallback(
    (index: number) => {
      const updatedSubjects = [...subjects];

      updatedSubjects[index].isShown = !updatedSubjects[index].isShown;

      setSubjects(updatedSubjects);
    },
    [subjects]
  );

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
        <title>Homework planner</title>
      </Head>
      <Flex
        height="100%"
        width="600px"
        margin={["0 auto"]}
        align="center"
        justify="center"
        flexDir="column"
      >
        {subjects.map((subject, subjectIndex) => (
          <Flex
            marginTop={subjectIndex !== 0 && "20px"}
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
              justify="center"
              width="82%"
              padding="8px 0"
            >
              <Text
                textDecoration={subject.isDone && "line-through"}
                fontWeight="500"
                fontSize="xl"
              >
                {subject.title}
              </Text>
              <Checkbox
                bg="white"
                marginLeft="10px"
                isChecked={subject.isDone}
                onChange={() => toggleCheckTitleCheckbox(subjectIndex)}
              />
              <IconButton
                aria-label="hide subject"
                position="absolute"
                right="5px"
                top="0"
                icon={subject.isShown ? "small-close" : "chevron-down"}
                onClick={() => handleToggleSubject(subjectIndex)}
              />
            </Flex>
            {subject.isShown && (
              <Flex
                bg="gray.50"
                align="center"
                justify="space-around"
                width="80%"
                flexDir="column"
                padding="8px 0"
                min-height="130px"
              >
                {subject.weeks.map((week, weekIndex) => (
                  <Flex
                    marginTop={weekIndex !== 0 && "16px"}
                    display="flex"
                    alignItems="center"
                    key={week.id}
                  >
                    <Text
                      textDecoration={
                        (subject.isDone && "line-through") ||
                        (week.isDone && "line-through")
                      }
                    >
                      Semana {week.number}:{" "}
                    </Text>
                    <Checkbox
                      onChange={() =>
                        toggleCheckWeekCheckbox(subjectIndex, weekIndex)
                      }
                      isChecked={subject.isDone || week.isDone}
                      marginLeft="10px"
                    />
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
