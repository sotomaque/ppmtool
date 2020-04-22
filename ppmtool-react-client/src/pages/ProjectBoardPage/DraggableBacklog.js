import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from "react-uuid";

import { makeStyles } from '@material-ui/core/styles';

const itemsFromBackend = [
    { id: uuid(), summary: 'First Item' },
    { id: uuid(), summary: 'second Task' },
]

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return; // nothing happens if we drop card outside context

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];

        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];

        // remove it from original 
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
        // place it back onto destination array


    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];

        // splice it out and remove item from array
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }

    
}

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const DraggableBacklog = ({ backlog }) => {

    const columnsFromBackend = {
        [uuid()]: {
            name: 'TO_DO',
            items: itemsFromBackend
        }, 
        [uuid()]: {
            name: 'IN_PROGRESS',
            items: backlog
        }, 
        [uuid()]: {
            name: 'DONE',
            items: []
        }
    }
    const classes = useStyles();
    const [columns, setColumns] = useState(columnsFromBackend);

    
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    if (!isEmpty(backlog) && columnsFromBackend[0]?.items !== []) {
        return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {
                Object.entries(columns).map(([id, column]) => {
                    return (
                        <div style={{ margin: 8 }} key={id}>
                            <h2 style={{color: 'black'}}>{column.name}</h2>
                            <Droppable droppableId={id} key={id} >
                                {
                                    (provided, snapshop) => {
                                        return (
                                            <div 
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshop.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {
                                                    column.items.map((item, index) => {
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                                {
                                                                    (provided, snapshot) => {
                                                                        return (
                                                                            <div ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={{
                                                                                    userSelect: 'none',
                                                                                    padding: 16,
                                                                                    margin: '0 0 8px 0',
                                                                                    minHeight: '50px',
                                                                                    backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                                                    color: 'white',
                                                                                    ...provided.draggableProps.style
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item.summary
                                                                                }
                                                                            </div>
                                                                        )
                                                                    }
                                                                }
                                                            </Draggable>
                                                        )
                                                    })
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                }
                            </Droppable>
                        </div>
                    )
                })
            }
            </DragDropContext>
        </div>
    )}

    else {
        return (
            <div><h1>LOADING...</h1></div>
        )
    }
}

export default DraggableBacklog;