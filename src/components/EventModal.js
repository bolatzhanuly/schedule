import React, {useContext, useState} from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = [
    {
        id: 1,
        color: "indigo",
        name: "Математика"
    },
    {
        id: 2,
        color: "gray",
        name: "Русский"
    },
    {
        id: 3,
        color: "green",
        name: "Английский"
    },
    {
        id: 4,
        color: "blue",
        name: "Химия"
    },
    {
        id: 5,
        color: "red",
        name: "Физика"
    },
    {
        id: 6,
        color: "purple",
        name: "Рисование"
    },
];

export default function EventModal() {
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            dispatchCalEvent({type: "update", payload: calendarEvent});
        } else {
            dispatchCalEvent({type: "push", payload: calendarEvent});
        }

        setShowEventModal(false);
    }

    const handleSelect = (e) => {
        console.log("aaa", e.target.value)
    };

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400"></span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    dispatchCalEvent({
                                        type: "delete",
                                        payload: selectedEvent,
                                    });
                                    setShowEventModal(false);
                                }}
                                className="material-icons-outlined text-gray-400 cursor-pointer"
                            >
                            delete
                          </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className="material-icons-outlined text-gray-400">close</span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="">
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Занятие"
                                value={title}
                                required
                                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex align-middle justify-center mt-6">
                            <p>{daySelected.format("dddd, MMMM DD")}</p>
                        </div>
                        <div className="mt-6">
                            <input
                                type="text"
                                name="description"
                                placeholder="Описание"
                                value={description}
                                required
                                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex align-middle justify-between mt-6">
                            <select id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={handleSelect}
                            >
                                <option value={0} selected>Выберите предмет</option>
                                {labelsClasses.map((label) => {
                                    return (
                                        <>
                                            <option key={label.id} value={label.id}>{label.name}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="flex align-middle justify-center mt-6">
                            <div className="flex gap-x-2">
                                {labelsClasses.map((lblClass, i) => (
                                    <div
                                        key={labelsClasses.id}
                                        onClick={() => setSelectedLabel(lblClass.id)}
                                        className={`bg-${lblClass.color}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Сохранить
                    </button>
                </footer>
            </form>
        </div>
);
}