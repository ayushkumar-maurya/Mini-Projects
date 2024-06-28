package com.projectnotes.notes;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageButton;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private ArrayList<String[]> notes;
    private ImageButton addNote;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        DbHandler handler = new DbHandler(this, "notesdb", null, 1);
        notes = handler.getNotes();
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        CustomAdapter c = new CustomAdapter(notes);
        recyclerView.setAdapter(c);

        addNote = findViewById(R.id.addNote);
        addNote.setOnClickListener(v -> {
            Intent intent = new Intent(this, CreateNewNote.class);
            startActivity(intent);
        });
    }
}