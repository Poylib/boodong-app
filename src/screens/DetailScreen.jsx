import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import BasicInformation from '../components/detail/BasicInformation';
import InformationField from '../components/detail/InformationField';
import InvestmentScore from '../components/detail/InvestmentScore';
import Prediction from '../components/detail/Prediction';
import Recommendation from '../components/detail/Recommendation';
import Report from '../components/detail/Report';
import SaleInformation from '../components/detail/SaleInformation';
import Title from '../components/detail/Title';
import TransactionPrice from '../components/detail/TransactionPrice';
import { DetailContainer } from '../components/detail/InvestmentScore';
import { blueColor, greyColor } from '../theme';
import { useNavigation } from '@react-navigation/native';
import detailArr from '../../mock/detailData.json';

const DetailScreen = ({ route }) => {
  const { text } = route.params;
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const [scrollToY, setScrollToY] = useState(0);
  const [ref, setRef] = useState();
  const [passData, setPassData] = useState({
    id: 1,
    title: {
      name: '',
      rank: 0,
    },
  });
  const [otherRank, setOtherRank] = useState([
    { name: '', rank: 0 },
    { name: '', rank: 0 },
  ]);

  const activeLike = () => {
    setLike(!like);
  };
  const handleScroll = () => {
    ref.scrollTo({ y: scrollToY, animated: true });
  };

  useEffect(() => {
    let selectRank = 0;
    const data = detailArr.filter((data, idx) => {
      if (data.title.name === text) {
        setPassData(data);
        if (idx > 0) setOtherRank([detailArr[idx - 1].title, detailArr[idx + 1].title]);
        else setOtherRank([{ name: '', rank: 0 }, detailArr[idx + 1].title]);
      }
    });
  }, []);
  return (
    <DetailScreenContainer //
      ref={ref => {
        setRef(ref);
      }}
      bounces={false}>
      <Title //
        activeLike={activeLike}
        like={like}
        data={passData.title}
        otherRank={otherRank}
      />
      <InvestmentScore score={passData.score} />
      <TransactionPrice />
      <View
        onLayout={e => {
          const layout = e.nativeEvent.layout;
          setScrollToY(layout.y);
        }}
      />
      <SaleInformation />
      <Prediction />
      <InformationField />
      <Report />
      <BasicInformation />
      <Recommendation />
      <DetailContainer>
        <ServiceText>혹시 아파트 정보가 수정이 필요하다면</ServiceText>
        <ServiceText>수정해주세요. 부동부동 서비스를</ServiceText>
        <ServiceText>함께 만들어가요!</ServiceText>
        <TouchableOpacity //
          onPress={() => navigation.navigate('Contact')}
          activeOpacity={1}>
          <ContactText>정정 및 요청 문의하기 ></ContactText>
        </TouchableOpacity>
      </DetailContainer>
      <DetailContainer style={{ marginBottom: 50 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <BottomBtn onPress={activeLike}>
            <IconView>
              <AntDesign name={'heart'} size={18} color={like ? blueColor : 'lightgrey'} />
            </IconView>
            <BtnText style={{ color: like ? blueColor : 'grey' }}>찜하기</BtnText>
          </BottomBtn>
          <BottomBtn onPress={handleScroll}>
            <BtnText style={{ color: blueColor }}>매물더보기+</BtnText>
          </BottomBtn>
        </View>
        <PrescribeBtn onPress={() => navigation.replace('Tabs', { screen: '처방전' })}>
          <BtnText style={{ color: 'white' }}>이 단지로 처방 받기</BtnText>
        </PrescribeBtn>
      </DetailContainer>
    </DetailScreenContainer>
  );
};

const DetailScreenContainer = styled.ScrollView`
  width: 100%;
`;

const ServiceText = styled.Text`
  color: grey;
`;

const ContactText = styled.Text`
  padding: 20px 0;
  color: ${blueColor};
  font-size: 16px;
  font-weight: 600;
`;

const BottomBtn = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  height: 55px;
  width: 49%;
  border-radius: 10px;
  flex-direction: row;
  border: 1px solid ${blueColor};
  align-items: center;
  justify-content: center;
`;

const IconView = styled.View`
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 10px;
  background-color: ${greyColor};
`;

const BtnText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const PrescribeBtn = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  height: 55px;
  margin-top: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${blueColor};
`;
export default DetailScreen;
