// src/pages/FeaturePage.tsx
import React, { useState } from 'react';
import { Stack } from '@fluentui/react';
import IntractData  from '../../../assets/Interact with data.svg'
import SourceReference  from '../../../assets/Quick source reference.svg'
import SummarizeContracts  from '../../../assets/Summarize contracts.svg'
import styles from './Cards.module.css'; // Create this CSS module for custom styles

interface CardsProps {
  onEvent: (data: string) => void;
}

const Cards: React.FC<CardsProps> = ({ onEvent }) => {

  const handleEvent = (data: string) => {
    onEvent(data);
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <section className={styles.cards}>
          <FeatureCard
            onEvent={handleEvent}
            question= "What is the purpose of this feature?"
            title="Interact with Data"
            description="Intuitive and conversational search experience that simplifies complex queries, ultimately improves productivity, job efficiency and satisfaction.​"
            icon={<img src = {IntractData} aria-hidden="true" alt="Intract with Data" role="none" aria-label='IntractwithData' aria-labelledby='Cards' style={{ minWidth: 20, minHeight: 22 }} />}
          />
          <FeatureCard
            onEvent={handleEvent}
            question='Quickly review and summarize lengthy documents, extracting essential details to streamline document review and preparation?'
            title="Summarize Contracts"
            description="Quickly review and summarize lengthy documents, extracting essential details to streamline document review and preparation."
            icon={<img src = {SummarizeContracts} aria-hidden="true" alt="Summarize Contracts" role="none" aria-label='SummarizeContracts' aria-labelledby='Cards'style={{ minWidth: 20, minHeight: 22 }} />}
          />
          <FeatureCard
            onEvent={handleEvent}
            question= "Effortlessly retrieve and reference original documents, ensuring accuracy and comprehensiveness?"
            title="Quick Source Reference"
            description="Effortlessly retrieve and reference original documents, ensuring accuracy and comprehensiveness."
            icon={<img src = {SourceReference} aria-hidden="true" alt="Source Reference" role="none" aria-label='SourceReference' aria-labelledby='Cards' style={{ minWidth: 20, minHeight: 22 }} />}
          />
        </section>
      </main>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  question:string;
  onEvent: (data: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon,question, onEvent }) => {
  const handleClick = () => {
    onEvent(question);
  };

  return (
      <div className={styles.featureCard} role="button" onClick={handleClick} >
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
  );
};

export default Cards;
