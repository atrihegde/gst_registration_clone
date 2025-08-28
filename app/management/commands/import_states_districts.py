import json
from django.core.management.base import BaseCommand
from app.models import State, District

class Command(BaseCommand):
    help = "Import states and districts from JSON"

    def handle(self, *args, **kwargs):
        with open("states-and-districts.json", "r", encoding="utf-8") as f:
            data = json.load(f)

        for state_data in data["states"]:
            state_name = state_data["state"].strip()
            state, created = State.objects.get_or_create(name=state_name)

            for district_name in state_data["districts"]:
                district_name = district_name.strip()
                District.objects.get_or_create(state=state, name=district_name)

        self.stdout.write(self.style.SUCCESS("States & districts imported successfully!"))
