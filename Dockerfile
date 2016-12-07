FROM python:3.5-slim
MAINTAINER Will Wolf <williamabrwolf@gmail.com>

WORKDIR /root

RUN apt-get update && apt-get install -y build-essential python3-dev libpq-dev

COPY requirements.txt /root
RUN pip install -r requirements.txt

COPY . /root
