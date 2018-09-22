# import libraries
from bs4 import BeautifulSoup
from urllib.request import urlopen
import json
import codecs

posts_list = []
# specify the url
page = "https://www.facebook.com/pg/expedia/posts/"
html = urlopen(page)
soup = BeautifulSoup(html, "html.parser")

# all events
# card = soup.find_all("div", attrs={"id":"pagelet_timeline_main_column"}, limit=8)

# event
card = soup.find("div", attrs={"class": "userContentWrapper"})


def scrape_facebook(post, count):

    if count == 0:
        return
    else:
        event_dict = {}
        current_card = post
        # event title (done)
        event_title = current_card.find("span", attrs={"class": "fcg"})
        event_dict["title"] = event_title.text
        # Event Time Stamp
        event_timestamp = current_card.find(
            "span", attrs={"class": "timestampContent"})
        event_dict["timestamp"] = event_timestamp.text
        # event content
        event_content = current_card.find(
            "div", attrs={"class": "userContent"})
        event_dict["text"] = event_content.text
        posts_list.append(event_dict)
        next_event = current_card.find_next(
            "div", attrs={"class": "userContentWrapper"})

    return scrape_facebook(next_event, count-1)


scrape_facebook(card, 8)

with open('facebook_posts.txt', 'wb') as outfile:
    json.dump(posts_list, codecs.getwriter(
        'utf-8')(outfile), ensure_ascii=False)
