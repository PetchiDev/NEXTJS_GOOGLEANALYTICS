import React from 'react';

interface ArticleCardProps {
  data?: Record<string, unknown>;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ data }) => {
  return (
    <div>
      {/* Stub ArticleCard component - replace with actual implementation */}
      <div>Article Card Placeholder {data ? '(with data)' : '(no data)'}</div>
    </div>
  );
};

export default ArticleCard; 