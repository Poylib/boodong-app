import { useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FixedHeader from '../components/Header';
import Card from '../components/search/Card';
import styled from 'styled-components/native';
import SearchData from '../../mock/SearchData.json';
import { backGroundColor, blueColor, greyColor, SCREEN_WIDTH } from '../theme';
import SearchBar from '../components/search/SearchBar';

const SearchScreen = () => {
  const [sort, setSort] = useState('');
  const [flatData, setFlatData] = useState(SearchData);
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [searchEmpty, setSearchEmpty] = useState(true);
  const [btnCheck, setBtnCheck] = useState(false);
  useEffect(() => {
    if (sort === '수익순') {
      let arr = flatData.sort((a, b) => b.profit - a.profit);
      setFlatData([...arr]);
    } else if (sort === '가격순') {
      let arr = flatData.sort((a, b) => b.price - a.price);
      setFlatData([...arr]);
    } else if (sort === '인기순') {
      let arr = flatData.sort((a, b) => b.like - a.like);
      setFlatData([...arr]);
    }
  }, [sort]);
  useEffect(() => {
    if (query) {
      const result = SearchData.filter(el => el.address.includes(query) || el.text.includes(query));
      if (result.length) {
        setSearchList(result);
        setSearchEmpty(false);
      } else {
        setSearchList([]);
        setSearchEmpty(true);
      }
    } else setSearchList(SearchData);
  }, [query]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white', paddingBottom: 79 }} edges={['top', 'bottom']}>
        <SearchBar //
          query={query}
          setQuery={setQuery}
          setModal={setModal}
          searchList={searchList}
          setFlatData={setFlatData}
        />
        <FixedHeader sort={sort} setSort={setSort} />

        <FlatList //
          style={{ height: '100%', backgroundColor: backGroundColor }}
          data={flatData}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={item => item.id}
          bounces={false}
          extraData={flatData}
        />
        {modal && query && (
          <Modal>
            <SearchView>
              {searchList.slice(0, 8).map(search => {
                let addressSplit = search.address.split(query);
                let nameSplit = search.text.split(query);
                return (
                  <SearchRow
                    key={search.id}
                    onPress={() => {
                      setFlatData([search]);
                      setModal(false);
                    }}>
                    <IconBox>
                      <Ionicons name={'map-outline'} size={15} color={'white'} />
                    </IconBox>
                    <SearchText>
                      {addressSplit[0]}
                      <SearchText style={{ color: blueColor }}>{addressSplit.length > 1 ? query : ''}</SearchText>
                      <SearchText>{addressSplit[1]} </SearchText>

                      <SearchText>{nameSplit[0]}</SearchText>
                      <SearchText style={{ color: blueColor }}>{nameSplit.length > 1 ? query : ''}</SearchText>
                      <SearchText>{nameSplit[1]}</SearchText>
                    </SearchText>
                  </SearchRow>
                );
              })}
            </SearchView>
            <TouchableOpacity //
              onPress={() => {
                Keyboard.dismiss();
                setModal(false);
              }}
              style={{ flex: 2.4 }}
            />
          </Modal>
        )}
      </SafeAreaView>
    </>
  );
};

const Modal = styled.View`
  position: absolute;
  bottom: 0;
  height: 108%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SearchView = styled.View`
  flex: 2;
  padding: 0 22px;
  width: 100%;
  background-color: white;
`;
const SearchRow = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  flex-direction: row;
  align-items: center;
  margin: 7px 0;
  width: 100%;
`;
const IconBox = styled.View`
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius:50px
  background-color: lightgrey;
`;

const SearchText = styled.Text`
  margin: 0 10px;
`;

export default SearchScreen;
