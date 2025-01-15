import React, {useState, useEffect} from 'react';
import MemoList from './components/MemoList';
import MemoForm from './components/MemoForm';
import { Heading, Center, Flex, Box } from "@chakra-ui/react"

type Memo = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

const App: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [formKey, setFormKey] = useState(0);

  // ローカルストレージからメモを読み込む
  useEffect(() => {
    const savedMemos = localStorage.getItem('memos');
    if(savedMemos){
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  // メモ変更時にローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  // メモ追加
  const addMemo = (title: string, content: string) => {
    const newMemo: Memo = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date()
    };
    setMemos([...memos, newMemo]);
  };

  // メモ削除
  const deleteMemo = (id: number) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  // メモ編集
  const editMemo = (updatedMemo: Memo) => {
    setMemos(memos.map(memo =>
      memo.id === updatedMemo.id ? updatedMemo : memo
    ));
    setEditingMemo(null);
  };

  // メモ削除とフォームクリア
  const deleteMemoAndClearForm = (id: number) => {
    deleteMemo(id);
    setFormKey(prevKey => prevKey + 1);
    setEditingMemo(null);
  };

  return (
    <>
    
      <Center p="20px">
      <Heading 
      size="4xl"
      color="teal"
      >
          メモ帳アプリ
      </Heading>
      </Center>
      <Flex w="95%" marginLeft="auto" marginRight="auto">
        <Box w="25%">
          <MemoList
            memos={memos}
            onDelete={deleteMemoAndClearForm}
            onEdit={setEditingMemo}
          />
        </Box>
        <Box flex="1">
          <MemoForm
            key={formKey}
            onAddMemo={addMemo}
            editingMemo={editingMemo}
            onEditMemo={editMemo}
          />
        </Box>
      </Flex>
    </>
  );
};

export default App;