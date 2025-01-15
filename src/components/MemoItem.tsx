import React from 'react';
import {Stack, Button, Box, Flex} from '@chakra-ui/react'

type Memo = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
  };

type MemoItemProps = {
    memo: Memo;
    onDelete: (id: number) => void;
    onEdit: (memmo: Memo) => void;
};

const MemoItem: React.FC<MemoItemProps> = ({
    memo,
    onDelete,
    onEdit
}) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(memo.id);
    };


    return (
        <Stack 

        onClick={() => onEdit(memo)}
        >
            <Flex alignItems="center" gap="20px">
                <Box>
                    <h3>{memo.title}</h3>
                    {/* <p>{memo.content}</p> */}
                    <small>{memo.createdAt.toLocaleString()}</small>
                    {/* <button onClick={() => onEdit(memo)}>編集</button> */}
                </Box>
                <Button 
                onClick={handleDelete}
                w="20%"
                size="xs"
                >削除</Button>
            </Flex>
        </Stack>
    );
};

export default MemoItem;