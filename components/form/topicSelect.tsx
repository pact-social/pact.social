import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { Pact, PactInput, PactType, Topic } from '../../src/gql'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { UseFormSetValue } from 'react-hook-form';

interface TopicProps {
  topics: Topic[];
  register: any;
  setValue: UseFormSetValue<PactInput>;
  defaultValues?: Pact;
}

type PactInputs = {
  type: PactType, 
  title: string,
  topicID: string,
  content: string,
  image?: string,
};

export default function TopicSelect({
  topics, 
  register, 
  setValue,
  defaultValues
}: TopicProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(defaultValues?.topic || topics?.[0])
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
    
    setSelectedTopic(newTopic);
    topics.push(newTopic);
  }

  const filteredTopics =
    query === ''
      ? topics
      : topics.filter((topic) => {
          return topic.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        })


  useEffect(() => {
    if (selectedTopic && !selectedTopic?.id) {
      // create the topic
      saveTopic(selectedTopic)
    }
    setValue('topicID', selectedTopic?.id)
  }, [selectedTopic]);

  return (
    <div className="w-full">
      <input type="hidden" {...register('topicID', {required: true})} value={selectedTopic?.id}/>
      <Combobox value={selectedTopic} onChange={setSelectedTopic}>
        <div className="relative mt-1">
          <div className="relative w-full min-h-12 inline-flex cursor-default bg-transparent text-left sm:text-sm">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900
              shadow-md 
              rounded-lg
              border
              border-primary
              focus:outline
              focus:outline-2
              focus:outline-primary
              focus:outline-offset-2
              "
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(topic: Topic) => topic.name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {query.length > 0 && (
                <Combobox.Option 
                  value={{ id: null, name: query }}
                  className="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Create &quot;{query}&quot;
                </Combobox.Option>
              )}
              {filteredTopics?.map((topic: Topic) => (
                <Combobox.Option
                  key={topic.id} 
                  value={topic}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {topic.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
