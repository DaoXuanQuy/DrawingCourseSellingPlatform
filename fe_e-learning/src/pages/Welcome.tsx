import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { Card } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px 0 rgba(35,49,128,0.02), 0 4px 8px 0 rgba(49,69,179,0.02)',
        borderRadius: '8px',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'justify',
        lineHeight: ' 22px',
        padding: '16px 19px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: 'rgba(0, 0, 0, 0.85)',
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(0,0,0,0.65)',
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        E-Learning {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  return (
    <>
      <BreadcrumbCustom subNav={[{ name: 'Trang chủ', path: '' }]} />
      {/* <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            'radial-gradient(circle at 97% 10%, #EBF2FF 0%, #F5F8FF 28%, #EBF1FF 124%)',
        }}
      > */}
        <div
          style={{
            // backgroundPosition: '100% -30%',
            // backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage:
              "url('icons/background-2.jpg')",
              height: 'calc(100vh - 56px)'
          }}
        >
          {/* <div
            style={{
              fontSize: '20px',
              color: '#1A1A1A',
            }}
          >
            Wellcom to E-Learning
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(0,0,0,0.65)',
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt ullam dignissimos, atque
            sit consequuntur sed saepe quos nam amet inventore quibusdam culpa, dolorem quas veniam
            optio. Fugiat velit et sit.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="http://localhost:8000/welcome"
              title="E-Learning"
              desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt ullam dignissimos, atque
              sit consequuntur sed saepe quos nam amet inventore quibusdam culpa, dolorem quas veniam
              optio. Fugiat velit et sit."
            />
            <InfoCard
              index={2}
              href="https://ant.design"
              title="E-Learning"
              desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt ullam dignissimos, atque
              sit consequuntur sed saepe quos nam amet inventore quibusdam culpa, dolorem quas veniam
              optio. Fugiat velit et sit."
            />
            <InfoCard
              index={3}
              href="http://localhost:8000/welcome"
              title="E-Learning"
              desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt ullam dignissimos, atque
              sit consequuntur sed saepe quos nam amet inventore quibusdam culpa, dolorem quas veniam
              optio. Fugiat velit et sit."
            />
          </div> */}
        </div>
      {/* </Card> */}
    </>
  );
};

export default Welcome;
