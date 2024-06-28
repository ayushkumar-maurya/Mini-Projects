package com.projectnotes.notes;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NavUtils;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

public class CreateNewNote extends AppCompatActivity {
    private EditText newNoteTitle, newNoteText;
    private ImageButton create;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_new_note);

        newNoteTitle = findViewById(R.id.viewNoteTitle);
        newNoteText = findViewById(R.id.viewNoteText);
        create = findViewById(R.id.create);
        create.setOnClickListener(v -> {
            String title = newNoteTitle.getText().toString();
            String text = newNoteText.getText().toString();
            if(title.length() > 0 || text.length() > 0) {
                DbHandler handler = new DbHandler(this, "notesdb", null, 1);
                handler.addNote(new Note(title, text));
                NavUtils.navigateUpFromSameTask(this);
            }
            else
                Toast.makeText(this, "Note is empty!", Toast.LENGTH_SHORT).show();
        });
    }
}