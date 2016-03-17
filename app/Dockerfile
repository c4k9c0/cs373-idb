FROM python:3.4

ENV PYTHONUNBUFFERED 1


ADD . /app

RUN echo “About to cat”

RUN ls

WORKDIR /app

RUN ls

RUN echo “Ending list”

RUN pip install -r requirements.txt

RUN echo “Where does this even show up lol”

CMD gunicorn app:app -b 0.0.0.0:8000
