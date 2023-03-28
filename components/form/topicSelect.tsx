import { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { Topic } from '../../src/gql'

interface TopicProps {
  topics: Topic[];
}

export default function TopicSelect({topics}: TopicProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic>()
  const [query, setQuery] = useState<string>('')
  
  const saveTopic = async (topic: Topic) => {
    const params = {topic: topic.name}
    const response = await fetch('/api/topics', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    if (response.status !== 200) {
      console.error('error adding a topic', response.status)
      return;
    }
    const {topicId} = await response.json();
    const newTopic = {
      ...topic,
      id: topicId,
    }
    console.log('topic created', newTopic);
    setSelectedTopic(newTopic);
    topics.push(newTopic);
  }

  const filteredTopics =
    query === ''
      ? topics
      : topics.filter((topic) => {
          return topic.name.toLowerCase().includes(query.toLowerCase())
        })


  useEffect(() => {
    if (selectedTopic && !selectedTopic?.id) {
      // create the topic
      console.log(selectedTopic);
      saveTopic(selectedTopic)
    }
  }, [selectedTopic])
  return (
    <Combobox value={selectedTopic} onChange={setSelectedTopic}>
      <Combobox.Input
        className=" input"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(topic: Topic) => topic.name}
      />
      <Combobox.Options>
        {query.length > 0 && (
          <Combobox.Option value={{ id: null, name: query }}>
            Create "{query}"
          </Combobox.Option>
        )}
        {filteredTopics?.map((topic: Topic) => (
          <Combobox.Option key={topic.id} value={topic}>
            {topic.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
