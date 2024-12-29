from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pandas as pd


def sentiment_analysis(stock_symbol):
    sia = SentimentIntensityAnalyzer()
    news_articles = [
        f"{stock_symbol}: The company posted strong earnings results.",
        f"{stock_symbol}: The stock price fell due to market concerns."
    ]
    sentiment_scores = []
    for article in news_articles:
        score = sia.polarity_scores(article)
        sentiment_scores.append(score['compound'])
    average_sentiment = sum(sentiment_scores) / len(sentiment_scores)
    return "Buy" if average_sentiment > 0 else "Sell"


# TODO in the future if need for all stocks it can be done with a simple for loop
stock_symbol = 'ALKB'
sentiment_recommendation = sentiment_analysis(stock_symbol)
print(f"Sentiment Recommendation for {stock_symbol}: {sentiment_recommendation}")
