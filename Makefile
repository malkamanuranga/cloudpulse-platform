.PHONY: help install lint test build run up down load

IMAGE ?= cloudpulse-api
TAG   ?= dev

help:
	@echo "targets: install lint test build run up down load"

install:
	npm ci

lint:
	npx eslint .

test:
	npm test

build:
	docker build -t $(IMAGE):$(TAG) .

run:
	docker run --rm -p 3000:3000 $(IMAGE):$(TAG)

up:
	docker compose up --build -d

down:
	docker compose down

load:
	k6 run tests/load/smoke.js
